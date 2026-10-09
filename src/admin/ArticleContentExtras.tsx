'use client';
import { useState } from 'react';
import { apiRequest } from '@/src/lib/api';

export type ArticleContentBlock = { image: string; heading: string; content: string };
export default function ArticleContentExtras({ blocks, onBlocksChange, onUploadingChange }: {
  blocks: ArticleContentBlock[];
  onBlocksChange(blocks: ArticleContentBlock[]): void;
  onUploadingChange(uploading: boolean): void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  async function upload(files: FileList | null, replaceIndex?: number) {
    if (!files?.length) return;
    const remaining = 8 - blocks.length + (replaceIndex === undefined ? 0 : 1);
    if (files.length > remaining) { setError(`You can add ${remaining} more image${remaining === 1 ? '' : 's'}.`); return; }
    setUploading(true); onUploadingChange(true); setError('');
    try {
      const next = [...blocks];
      for (const [fileIndex, file] of Array.from(files).entries()) {
        const form = new FormData(); form.append('image', file);
        const result = await apiRequest<{ url: string }>('/api/admin/articles/upload', { method: 'POST', body: form });
        if (fileIndex === 0 && replaceIndex !== undefined) next[replaceIndex] = { ...next[replaceIndex], image: result.url };
        else next.push({ image: result.url, heading: '', content: '' });
      }
      onBlocksChange(next);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Image upload failed'); }
    finally { setUploading(false); onUploadingChange(false); }
  }
  function update(index: number, patch: Partial<ArticleContentBlock>) {
    onBlocksChange(blocks.map((block, blockIndex) => blockIndex === index ? { ...block, ...patch } : block));
  }
  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks]; [next[index], next[target]] = [next[target], next[index]]; onBlocksChange(next);
  }
  return <div className="admin-content-extras wide">
    <div className="admin-extra-heading"><div><h3>Image and text sections</h3><p>Each image stays paired with its heading and description. Reordering moves the whole section.</p></div><label className="admin-quiet admin-gallery-upload">{uploading ? 'Uploading…' : 'Add photos'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" multiple disabled={uploading || blocks.length >= 8} onChange={event => { void upload(event.currentTarget.files); event.currentTarget.value = ''; }}/></label></div>
    {error && <p className="admin-extra-error" role="alert">{error}</p>}
    {blocks.map((block, index) => <fieldset className="admin-section-editor admin-content-block-editor" key={index}>
      <legend>Image and section {index + 1}</legend>
      <div className="admin-block-controls"><button type="button" className="admin-quiet" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move section ${index + 1} up`}><i className="ri-arrow-up-line"/></button><button type="button" className="admin-quiet" disabled={index === blocks.length - 1} onClick={() => move(index, 1)} aria-label={`Move section ${index + 1} down`}><i className="ri-arrow-down-line"/></button><button type="button" className="admin-quiet admin-block-remove" onClick={() => onBlocksChange(blocks.filter((_, blockIndex) => blockIndex !== index))}><i className="ri-delete-bin-line"/> Remove section</button></div>
      {block.image ? <img className="admin-block-image" src={block.image} alt={`Section ${index + 1} preview`}/> : <div className="admin-block-image-empty"><i className="ri-image-add-line"/><span>Add an image to pair with this section</span></div>}
      <label className="admin-quiet admin-gallery-upload admin-replace-image">{block.image ? 'Replace image' : 'Choose image'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" disabled={uploading} onChange={event => { void upload(event.currentTarget.files, index); event.currentTarget.value = ''; }}/></label>
      <label>Heading<input maxLength={140} value={block.heading} onChange={event => update(index, { heading: event.target.value })} placeholder="Section heading"/></label>
      <label>Description<textarea rows={4} maxLength={15000} value={block.content} onChange={event => update(index, { content: event.target.value })} placeholder="Describe this image or section"/></label>
    </fieldset>)}
    <button type="button" className="admin-quiet admin-add-content-block" disabled={blocks.length >= 8} onClick={() => onBlocksChange([...blocks, { image: '', heading: '', content: '' }])}><i className="ri-add-line"/> Add paired section</button>
  </div>;
}
