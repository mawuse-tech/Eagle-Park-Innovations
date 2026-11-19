"use client";
import { useState } from "react";
import { apiRequest } from "@/src/lib/api";
import { confirmAdminDelete, showAdminAlert } from "./alerts";

export type ArticleContentBlock = {
  image: string;
  heading: string;
  content: string;
};
export default function ArticleContentExtras({
  blocks,
  onBlocksChange,
  onUploadingChange,
}: {
  blocks: ArticleContentBlock[];
  onBlocksChange(blocks: ArticleContentBlock[]): void;
  onUploadingChange(uploading: boolean): void;
}) {
  const [uploading, setUploading] = useState(false);
  async function upload(files: FileList | null, replaceIndex?: number) {
    if (!files?.length) return;
    const remaining = 8 - blocks.length + (replaceIndex === undefined ? 0 : 1);
    if (files.length > remaining) {
      void showAdminAlert(
        "warning",
        "Image limit reached",
        `You can add ${remaining} more image${remaining === 1 ? "" : "s"}.`,
      );
      return;
    }
    setUploading(true);
    onUploadingChange(true);
    try {
      const next = [...blocks];
      for (const [fileIndex, file] of Array.from(files).entries()) {
        const form = new FormData();
        form.append("image", file);
        const result = await apiRequest<{ url: string }>(
          "/api/admin/articles/upload",
          { method: "POST", body: form },
        );
        if (fileIndex === 0 && replaceIndex !== undefined)
          next[replaceIndex] = { ...next[replaceIndex], image: result.url };
        else next.push({ image: result.url, heading: "", content: "" });
      }
      onBlocksChange(next);
      void showAdminAlert(
        "success",
        "Image uploaded",
        `${files.length} image${files.length === 1 ? "" : "s"} added to the article.`,
      );
    } catch (cause) {
      void showAdminAlert(
        "error",
        "Image upload failed",
        cause instanceof Error ? cause.message : "Please try again.",
      );
    } finally {
      setUploading(false);
      onUploadingChange(false);
    }
  }
  function update(index: number, patch: Partial<ArticleContentBlock>) {
    onBlocksChange(
      blocks.map((block, blockIndex) =>
        blockIndex === index ? { ...block, ...patch } : block,
      ),
    );
  }
  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onBlocksChange(next);
  }
  async function removeBlock(index: number) {
    if (await confirmAdminDelete(`image and section ${index + 1}`))
      onBlocksChange(blocks.filter((_, blockIndex) => blockIndex !== index));
  }
  return (
    <div className="col-span-full pt-[10px]">
      <div className="my-[22px] mb-[14px] flex items-center justify-between gap-4 max-[650px]:items-start">
        <div>
          <h3 className="text-base font-bold text-[#25332a]">
            Image and text sections
          </h3>
          <p className="mt-[5px] text-xs text-[#778078]">
            Each image stays paired with its heading and description. Reordering
            moves the whole section.
          </p>
        </div>
        <label className="relative inline-flex min-h-[38px] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-[#e0e7e1] px-3 text-xs text-[#526257]">
          {uploading ? "Uploading…" : "Add photos"}
          <input
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            multiple
            disabled={uploading || blocks.length >= 8}
            onChange={(event) => {
              void upload(event.currentTarget.files);
              event.currentTarget.value = "";
            }}
          />
        </label>
      </div>
      {blocks.map((block, index) => (
        <fieldset
          className="relative my-[14px] grid grid-cols-[minmax(0,1fr)_auto] items-start gap-[14px] rounded-[10px] border border-[#e2e8e2] p-[18px] max-[600px]:p-[14px] [&>legend]:px-2 [&>legend]:text-[11px] [&>legend]:font-bold [&>legend]:text-[#5b685e] [&>img]:col-span-full [&>label:not(:has(input[type=file]))]:col-span-full [&>label:not(:has(input[type=file]))]:grid [&>label:not(:has(input[type=file]))]:gap-[7px] [&>label:not(:has(input[type=file]))]:text-xs [&>label:not(:has(input[type=file]))]:font-semibold [&>label:not(:has(input[type=file]))]:text-[#435047] [&>label:not(:has(input[type=file]))_input]:w-full [&>label:not(:has(input[type=file]))_input]:rounded-md [&>label:not(:has(input[type=file]))_input]:border [&>label:not(:has(input[type=file]))_input]:border-[#dfe5df] [&>label:not(:has(input[type=file]))_input]:bg-white [&>label:not(:has(input[type=file]))_input]:px-3 [&>label:not(:has(input[type=file]))_input]:py-[11px] [&>label:not(:has(input[type=file]))_input]:font-[inherit] [&>label:not(:has(input[type=file]))_input]:text-[#25332a] [&>label:not(:has(input[type=file]))_textarea]:w-full [&>label:not(:has(input[type=file]))_textarea]:resize-y [&>label:not(:has(input[type=file]))_textarea]:rounded-md [&>label:not(:has(input[type=file]))_textarea]:border [&>label:not(:has(input[type=file]))_textarea]:border-[#dfe5df] [&>label:not(:has(input[type=file]))_textarea]:bg-white [&>label:not(:has(input[type=file]))_textarea]:px-3 [&>label:not(:has(input[type=file]))_textarea]:py-[11px] [&>label:not(:has(input[type=file]))_textarea]:font-[inherit] [&>label:not(:has(input[type=file]))_textarea]:text-[#25332a]"
          key={index}
        >
          <legend>Image and section {index + 1}</legend>
          <div className="flex items-center justify-self-end gap-1.5">
            <button
              type="button"
              className="inline-flex min-h-[34px] items-center justify-center rounded-md border border-[#e0e7e1] px-[10px] text-xs text-[#526257] disabled:cursor-default disabled:opacity-40 max-[600px]:px-2"
              disabled={index === 0}
              onClick={() => move(index, -1)}
              aria-label={`Move section ${index + 1} up`}
            >
              <i className="ri-arrow-up-line" />
            </button>
            <button
              type="button"
              className="inline-flex min-h-[34px] items-center justify-center rounded-md border border-[#e0e7e1] px-[10px] text-xs text-[#526257] disabled:cursor-default disabled:opacity-40 max-[600px]:px-2"
              disabled={index === blocks.length - 1}
              onClick={() => move(index, 1)}
              aria-label={`Move section ${index + 1} down`}
            >
              <i className="ri-arrow-down-line" />
            </button>
            <button
              type="button"
              className="inline-flex min-h-[38px] items-center justify-center rounded-md border border-[#e0e7e1] px-3 text-xs text-[#a54336] max-[600px]:px-2"
              onClick={() => void removeBlock(index)}
            >
              <i className="ri-delete-bin-line" /> Remove section
            </button>
          </div>
          {block.image ? (
            <img
              className="col-span-full block aspect-video max-h-[240px] w-full max-w-[460px] rounded-lg bg-[#edf1ed] object-cover"
              src={block.image}
              alt={`Section ${index + 1} preview`}
            />
          ) : (
            <div className="col-span-full flex aspect-video w-full max-w-[460px] items-center justify-center gap-[10px] rounded-lg border border-dashed border-[#cbd5cc] text-[13px] text-[#778078]">
              <i className="ri-image-add-line text-[21px]" />
              <span>Add an image to pair with this section</span>
            </div>
          )}
          <label className="relative col-span-full inline-flex min-h-[38px] w-fit cursor-pointer items-center justify-center justify-self-start overflow-hidden rounded-md border border-[#e0e7e1] px-3 text-xs text-[#526257]">
            {block.image ? "Replace image" : "Choose image"}
            <input
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              disabled={uploading}
              onChange={(event) => {
                void upload(event.currentTarget.files, index);
                event.currentTarget.value = "";
              }}
            />
          </label>
          <label className="col-span-full grid gap-[7px] text-xs font-semibold text-[#435047]">
            Heading
            <input
              className="w-full rounded-md border border-[#dfe5df] bg-white px-3 py-[11px] font-[inherit] text-[#25332a]"
              maxLength={140}
              value={block.heading}
              onChange={(event) =>
                update(index, { heading: event.target.value })
              }
              placeholder="Section heading"
            />
          </label>
          <label className="col-span-full grid gap-[7px] text-xs font-semibold text-[#435047]">
            Description
            <textarea
              className="w-full resize-y rounded-md border border-[#dfe5df] bg-white px-3 py-[11px] font-[inherit] text-[#25332a]"
              rows={4}
              maxLength={15000}
              value={block.content}
              onChange={(event) =>
                update(index, { content: event.target.value })
              }
              placeholder="Describe this image or section"
            />
          </label>
        </fieldset>
      ))}
      <button
        type="button"
        className="mt-[6px] inline-flex min-h-[38px] items-center justify-center rounded-md border border-[#e0e7e1] px-3 text-xs text-[#526257]"
        disabled={blocks.length >= 8}
        onClick={() =>
          onBlocksChange([...blocks, { image: "", heading: "", content: "" }])
        }
      >
        <i className="ri-add-line" /> Add paired section
      </button>
    </div>
  );
}
