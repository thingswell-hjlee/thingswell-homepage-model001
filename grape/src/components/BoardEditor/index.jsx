import React, { useRef, useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { supabase } from '../../lib/supabase';
import { uploadImage, validateImageFile } from '../../utils/imageUpload';
import './BoardEditor.css';

const BoardEditor = ({
  onSave,
  initialContent = '',
  title = '',
  onTitleChange,
  tableName,
  onCancel,
  existingId = null, // 편집할 게시물의 ID
  isEditMode = false // 편집 모드 여부
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // 브라우저 뒤로 가기 및 새로고침 방지
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // 작성 중인 내용이 있으면 경고
      const hasContent = currentTitle.trim() || editorState.getCurrentContent().hasText();
      if (hasContent) {
        e.preventDefault();
        e.returnValue = '작성 중인 내용이 있습니다. 정말로 나가시겠습니까?';
        return e.returnValue;
      }
    };

    // 브라우저 뒤로 가기 이벤트 처리
    const handlePopState = (e) => {
      const hasContent = currentTitle.trim() || editorState.getCurrentContent().hasText();
      if (hasContent) {
        const confirmLeave = window.confirm('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?');
        if (!confirmLeave) {
          // 뒤로 가기 취소 - 현재 페이지 유지
          e.preventDefault();
          // 현재 상태를 다시 push하여 뒤로 가기를 막음
          window.history.pushState(null, '', window.location.href);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentTitle, editorState]);

  console.log('BoardEditor props:', {
    initialContent: initialContent ? initialContent.substring(0, 100) + '...' : 'empty',
    title,
    isEditMode,
    existingId
  });

  // 초기 콘텐츠 설정
  useEffect(() => {
    if (initialContent) {
      try {
        console.log('편집 모드 - 초기 콘텐츠:', initialContent);
        
        // HTML 문자열을 Draft.js ContentState로 변환
        const contentBlock = htmlToDraft(initialContent);
        console.log('변환된 contentBlock:', contentBlock);
        
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          console.log('변환된 contentState:', contentState);
          setEditorState(EditorState.createWithContent(contentState));
        } else {
          console.warn('contentBlock이 null입니다. 빈 에디터로 설정합니다.');
          setEditorState(EditorState.createEmpty());
        }
      } catch (error) {
        console.error('초기 콘텐츠 변환 오류:', error);
        console.log('HTML을 텍스트로 변환하여 시도합니다.');
        
        // HTML 태그를 제거하고 텍스트만 추출
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = initialContent;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        console.log('추출된 텍스트:', textContent);
        
        // 텍스트로 ContentState 생성
        const contentState = ContentState.createFromText(textContent);
        setEditorState(EditorState.createWithContent(contentState));
      }
    } else {
      console.log('새 글 작성 모드 - 빈 에디터로 설정');
      setEditorState(EditorState.createEmpty());
    }
  }, [initialContent]);

  const handleSave = async () => {
    if (!currentTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!tableName) {
      console.error('테이블명이 지정되지 않았습니다.');
      alert('테이블명이 지정되지 않았습니다.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Draft.js 콘텐츠를 HTML로 변환
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);
      
      console.log('저장할 HTML 콘텐츠:', htmlContent);
      console.log('Raw Content State:', rawContentState);
      
      // HTML에서 이미지 URL 추출
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const images = [];
      let match;
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        images.push(match[1]);
      }
      console.log('추출된 이미지 URL들:', images);
      
      let data, error;

      if (isEditMode && existingId) {
        // 편집 모드: 기존 게시물 업데이트
        const { data: updateData, error: updateError } = await supabase
          .from(tableName)
          .update({
            title: currentTitle.trim(),
            content: htmlContent,
            images: images.length > 0 ? JSON.stringify(images) : null,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingId)
          .select();

        data = updateData;
        error = updateError;
      } else {
        // 생성 모드: 새 게시물 생성
        const { data: insertData, error: insertError } = await supabase
          .from(tableName)
          .insert([
            {
              title: currentTitle.trim(),
              content: htmlContent,
              images: images.length > 0 ? JSON.stringify(images) : null,
              created_at: new Date().toISOString()
            }
          ])
          .select();

        data = insertData;
        error = insertError;
      }

      if (error) {
        console.error('저장 오류:', error);
        setSaveError(`저장 중 오류가 발생했습니다: ${error.message}`);
        alert(`저장 중 오류가 발생했습니다: ${error.message}`);
        return;
      }

      console.log('저장 성공:', data);
      
      // 성공 시 콜백 호출
      if (onSave) {
        onSave({
          title: currentTitle,
          content: htmlContent,
          rawContent: rawContentState,
          savedData: data[0],
          isEdit: isEditMode
        });
      }

      // 성공 메시지
      const message = isEditMode ? '게시글이 성공적으로 수정되었습니다.' : '게시글이 성공적으로 저장되었습니다.';
      alert(message);
      
    } catch (err) {
      console.error('저장 중 예외 발생:', err);
      setSaveError(`저장 중 오류가 발생했습니다: ${err.message}`);
      alert(`저장 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // 작성 중인 내용이 있는지 확인
    const hasContent = currentTitle.trim() || editorState.getCurrentContent().hasText();

    if (hasContent) {
      const confirmCancel = window.confirm('작성 중인 내용이 있습니다. 정말로 취소하시겠습니까?');
      if (!confirmCancel) {
        return; // 취소하지 않음
      }
    }

    if (onCancel) {
      onCancel();
    } else {
      console.log('편집 취소 - 게시판으로 돌아감');
      // onCancel이 없으면 브라우저의 뒤로 가기 사용
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // 히스토리가 없으면 기본 경로로 이동
        window.location.href = '/customer-service/announcement';
      }
    }
  };



  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className="board-editor">
      <div className="editor-header">
        <div className="editor-mode-indicator">
          {isEditMode ? '게시글 수정' : '새 게시글 작성'}
        </div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className="title-input"
        />
      </div>
      
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="editor-wrapper"
          editorClassName="editor-content"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
            },
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            },
            list: {
              inDropdown: false,
              options: ['unordered', 'ordered'],
            },
            textAlign: {
              inDropdown: false,
              options: ['left', 'center', 'right', 'justify'],
            },
            colorPicker: {
              colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#9400d3'],
            },
            link: {
              inDropdown: false,
              options: ['link', 'unlink'],
            },
            emoji: {
              inDropdown: false,
              options: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'],
            },
            image: {
              uploadCallback: async (file) => {
                try {
                  // 50MB까지 허용하도록 validateImageFile 호출
                  validateImageFile(file, 50);
                  // Product와 동일한 방식으로 이미지 업로드
                  const imageUrl = await uploadImage(file, 'announcement', 'announcement');
                  return { data: { link: imageUrl } };
                } catch (error) {
                  console.error('이미지 업로드 실패:', error);
                  alert(error.message || '이미지 업로드에 실패했습니다.');
                  throw error;
                }
              },
              alt: { present: true, mandatory: false },
            },
          }}
          placeholder="내용을 입력하세요..."
        />
      </div>
      
      {saveError && (
        <div className="save-error">
          {saveError}
        </div>
      )}
      
      <div className="editor-actions">
        <button onClick={handleCancel} className="btn-cancel" disabled={isSaving}>
          취소
        </button>
        <button onClick={handleSave} className="btn-save" disabled={isSaving}>
          {isSaving ? '저장 중...' : (isEditMode ? '수정' : '저장')}
        </button>
      </div>
    </div>
  );
};

export default BoardEditor; 