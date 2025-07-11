import React, { useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import './BoardEditor.css';

const BoardEditor = ({ onSave, initialContent = '', title = '', onTitleChange }) => {
  const editorRef = useRef();
  const [content, setContent] = useState(initialContent);
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    const htmlContent = editorInstance.getHTML();
    
    setContent(markdownContent);
    
    if (onSave) {
      onSave({
        title: currentTitle,
        content: markdownContent,
        htmlContent
      });
    }
  };

  const handleCancel = () => {
    // 취소 로직
    console.log('편집 취소');
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
      
      <div className="editor-actions">
        <button onClick={handleCancel} className="btn-cancel">
          취소
        </button>
        <button onClick={handleSave} className="btn-save">
          저장
        </button>
      </div>
    </div>
  );
};

export default BoardEditor; 