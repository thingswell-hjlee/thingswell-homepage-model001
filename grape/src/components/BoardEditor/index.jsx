import React, { useRef, useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { supabase } from '../../lib/supabase';
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

  // 초기 콘텐츠 설정
  useEffect(() => {
    if (initialContent) {
      try {
        // HTML 문자열을 Draft.js ContentState로 변환
        const contentBlock = htmlToDraft(initialContent);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error('초기 콘텐츠 변환 오류:', error);
        setEditorState(EditorState.createEmpty());
      }
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
      
      let data, error;

      if (isEditMode && existingId) {
        // 편집 모드: 기존 게시물 업데이트
        const { data: updateData, error: updateError } = await supabase
          .from(tableName)
          .update({
            title: currentTitle.trim(),
            content: htmlContent,
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
    if (onCancel) {
      onCancel();
    } else {
      console.log('편집 취소');
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
              uploadCallback: (file) => {
                return new Promise((resolve, reject) => {
                  // 이미지 업로드 로직을 여기에 구현할 수 있습니다
                  const reader = new FileReader();
                  reader.onload = () => {
                    resolve({ data: { link: reader.result } });
                  };
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });
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