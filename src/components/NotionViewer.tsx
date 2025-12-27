"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import "react-notion-x/src/styles.css";

interface NotionViewerProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionViewer({ recordMap }: NotionViewerProps) {
  return (
    <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
  );
}
