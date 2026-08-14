import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

import { NotionBlock } from "@/lib/notion/notion-to-page";

interface NotionViewerProps {
  blocks: NotionBlock[];
}

type RichTextBlock = {
  rich_text: RichTextItemResponse[];
  color?: string;
};

function RichText({ text }: { text: RichTextItemResponse[] }) {
  return text.map((item, index) => {
    const content = item.plain_text;
    const annotations = item.annotations;
    const className = [
      annotations.bold && "font-bold",
      annotations.italic && "italic",
      annotations.strikethrough && "line-through",
      annotations.underline && "underline",
      annotations.code && "rounded bg-gray-100 px-1 py-0.5 font-mono text-sm",
    ]
      .filter(Boolean)
      .join(" ");
    const element = <span className={className}>{content}</span>;

    return item.href ? (
      <a
        key={`${item.plain_text}-${item.href}`}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="text-blue-700 underline underline-offset-2"
      >
        {element}
      </a>
    ) : (
      <span key={`${item.plain_text}-${index}`}>{element}</span>
    );
  });
}

function getRichTextBlock(block: NotionBlock["block"]): RichTextBlock | null {
  const value: unknown = block[block.type as keyof typeof block];
  return typeof value === "object" && value !== null && "rich_text" in value
    ? (value as RichTextBlock)
    : null;
}

function getImageUrl(block: NotionBlock["block"]): string | null {
  if (block.type !== "image") return null;
  const image = block.image;
  return image.type === "external" ? image.external.url : image.file.url;
}

function NotionBlockRenderer({ item }: { item: NotionBlock }) {
  const { block, children } = item;
  const content = getRichTextBlock(block)?.rich_text ?? [];

  switch (block.type) {
    case "heading_1":
      return (
        <h1 className="mb-5 mt-10 text-3xl font-bold">
          <RichText text={content} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="mb-4 mt-8 text-2xl font-bold">
          <RichText text={content} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="mb-3 mt-6 text-xl font-bold">
          <RichText text={content} />
        </h3>
      );
    case "paragraph":
      return (
        <p className="my-3 whitespace-pre-wrap break-keep leading-7 text-gray-800">
          <RichText text={content} />
        </p>
      );
    case "bulleted_list_item":
      return (
        <div className="my-1 flex gap-2 break-keep leading-7">
          <span aria-hidden>•</span>
          <div>
            <RichText text={content} />
            {children.map((child) => (
              <NotionBlockRenderer key={child.block.id} item={child} />
            ))}
          </div>
        </div>
      );
    case "numbered_list_item":
      return (
        <div className="my-1 flex gap-2 break-keep leading-7">
          <span aria-hidden>•</span>
          <div>
            <RichText text={content} />
            {children.map((child) => (
              <NotionBlockRenderer key={child.block.id} item={child} />
            ))}
          </div>
        </div>
      );
    case "to_do":
      return (
        <div className="my-2 flex gap-2 leading-7">
          <input
            aria-label="Notion task"
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
          />
          <span>
            <RichText text={content} />
          </span>
        </div>
      );
    case "quote":
      return (
        <blockquote className="my-5 border-l-4 border-gray-300 pl-4 leading-7 text-gray-700">
          <RichText text={content} />
        </blockquote>
      );
    case "code":
      return (
        <pre className="my-5 overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
          <code>
            <RichText text={content} />
          </code>
        </pre>
      );
    case "divider":
      return <hr className="my-8 border-gray-200" />;
    case "image": {
      const src = getImageUrl(block);
      return src ? (
        <Image
          src={src}
          alt={block.image.caption
            .map((caption) => caption.plain_text)
            .join("")}
          width={1600}
          height={900}
          unoptimized
          className="my-6 h-auto w-full object-contain"
        />
      ) : null;
    }
    case "table":
      return (
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              {children.map((row) => (
                <NotionBlockRenderer key={row.block.id} item={row} />
              ))}
            </tbody>
          </table>
        </div>
      );
    case "table_row":
      return (
        <tr>
          {block.table_row.cells.map((cell, index) => (
            <td
              key={index}
              className="border border-gray-300 px-3 py-2 align-top"
            >
              <RichText text={cell} />
            </td>
          ))}
        </tr>
      );
    default:
      return children.length > 0 ? (
        <>
          {children.map((child) => (
            <NotionBlockRenderer key={child.block.id} item={child} />
          ))}
        </>
      ) : null;
  }
}

export default function NotionViewer({ blocks }: NotionViewerProps) {
  return (
    <article className="py-6">
      {blocks.map((item) => (
        <NotionBlockRenderer key={item.block.id} item={item} />
      ))}
    </article>
  );
}
