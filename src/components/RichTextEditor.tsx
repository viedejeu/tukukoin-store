"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageResize from 'tiptap-extension-resize-image';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading2, Heading3, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function RichTextEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      ImageResize,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-sm bg-background border border-t-0 border-black-border rounded-b-lg'
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div className="min-h-[300px] bg-background border border-black-border rounded-lg p-4 animate-pulse">Memuat Editor...</div>;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    if (previousUrl) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt('URL:');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        toast.error(data.error || "Gagal mengunggah gambar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengunggah");
    } finally {
      setIsUploadingImage(false);
      // Reset input value so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-black-light border border-black-border rounded-t-lg">
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run() }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('strike') ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        
        <div className="w-px h-5 bg-gray-700 mx-1"></div>

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-700 mx-1"></div>

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('orderedList') ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-700 mx-1"></div>

        <button
          onClick={(e) => { e.preventDefault(); toggleLink() }}
          className={`p-1.5 rounded-md transition-colors ${editor.isActive('link') ? 'bg-gold text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Tautan"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); addImage() }}
          disabled={isUploadingImage}
          className={`p-1.5 rounded-md transition-colors ${isUploadingImage ? 'text-gold' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Gambar"
        >
          {isUploadingImage ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </button>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
