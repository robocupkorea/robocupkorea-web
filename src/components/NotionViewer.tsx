"use client";

import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/styles.css";

interface NotionViewerProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionViewer({ recordMap }: NotionViewerProps) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{ nextImage: Image, nextLink: Link, Collection: () => null }}
      fullPage={false}
      darkMode={false}
    />
  );
}
