import React, { useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { supabase } from '../lib/supabase';
import './BoardEditor.css';

const BoardEditor = ({ onSave, initialContent = '', title = '', onTitleChange, tableName, onCancel }) => {
  const editorRef = useRef();
  const [content, setContent] = useState(initialContent);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

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
      const editorInstance = editorRef.current.getInstance();
      const markdownContent = editorInstance.getMarkdown();
      const htmlContent = editorInstance.getHTML();
      
      setContent(markdownContent);
      
      // Supabase에 데이터 저장
      const { data, error } = await supabase
        .from(tableName)
        .insert([
          {
            title: currentTitle.trim(),
            content: markdownContent,
            created_at: new Date().toISOString()
          }
        ])
        .select();

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
          content: markdownContent,
          htmlContent,
          savedData: data[0]
        });
      }

      // 성공 메시지
      alert('게시글이 성공적으로 저장되었습니다.');
      
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

  return (
    <div className="board-editor">
      <div className="editor-header">
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
          ref={editorRef}
          initialValue={content}
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          language="ko-KR"
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
            ['scrollSync']
          ]}
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
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default BoardEditor; 