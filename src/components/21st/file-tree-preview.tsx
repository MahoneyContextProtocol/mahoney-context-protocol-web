"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileTreeItem {
  id: string;
  name: string;
  path?: string;
  kind: "file" | "folder";
  depth?: number;
  expanded?: boolean;
  status?: "added" | "modified" | "verified";
  badge?: string;
}

export interface FileTreeNode {
  name: string;
  type: "file" | "folder";
  badge?: string;
  meta?: string;
  children?: FileTreeNode[];
}

export interface FileTreePreviewProps {
  title?: string;
  items?: FileTreeItem[];
  nodes?: FileTreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function flattenNodes(nodes: FileTreeNode[], depth = 0, prefix = ""): FileTreeItem[] {
  const out: FileTreeItem[] = [];
  for (const n of nodes) {
    const id = prefix ? `${prefix}/${n.name}` : n.name;
    out.push({
      id,
      name: n.name,
      kind: n.type,
      depth,
      expanded: true,
      badge: n.meta ?? n.badge,
      status:
        n.badge === "A"
          ? "added"
          : n.badge === "M"
            ? "modified"
            : n.badge === "✓"
              ? "verified"
              : undefined,
    });
    if (n.children && n.children.length > 0) {
      out.push(...flattenNodes(n.children, depth + 1, id));
    }
  }
  return out;
}

export function FileTreePreview({
  title = "Protocol Bundle Tree",
  items,
  nodes,
  selectedId,
  onSelect,
  className,
}: FileTreePreviewProps) {
  const resolvedItems: FileTreeItem[] = items ?? (nodes ? flattenNodes(nodes) : []);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const item of resolvedItems) {
      if (item.kind === "folder" && item.expanded !== false) {
        init[item.id] = true;
      }
    }
    return init;
  });

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith(".json")) return <FileJson className="h-3.5 w-3.5 text-emerald-400 shrink-0" />;
    if (name.endsWith(".ts") || name.endsWith(".tsx") || name.endsWith(".js")) {
      return <FileCode2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />;
    }
    return <FileText className="h-3.5 w-3.5 text-zinc-400 shrink-0" />;
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-[#121215] p-3 font-sans text-xs text-zinc-300 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]",
        className
      )}
    >
      <header className="flex items-center justify-between border-b border-white/[0.06] px-2 pb-2 mb-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {title}
        </span>
        <span className="font-mono text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 tabular-nums">
          {resolvedItems.filter((i) => i.kind === "file").length} artifacts
        </span>
      </header>

      <ul className="space-y-0.5 max-h-[380px] overflow-y-auto pr-1" role="tree">
        {resolvedItems.map((item) => {
          const depth = item.depth ?? 0;
          const isFolder = item.kind === "folder";
          const isOpen = isFolder ? expandedFolders[item.id] ?? true : false;
          const isSelected = item.id === selectedId;

          return (
            <li key={item.id} role="treeitem" aria-selected={isSelected}>
              <button
                type="button"
                onClick={() => {
                  if (isFolder) {
                    toggleFolder(item.id);
                  } else {
                    onSelect?.(item.id);
                  }
                }}
                style={{ paddingLeft: `${depth * 14 + 8}px` }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg py-1.5 pr-2.5 text-left font-mono text-[11px] transition-all",
                  isSelected
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100 border border-transparent"
                )}
              >
                {isFolder ? (
                  <>
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 text-zinc-500 transition-transform",
                        isOpen && "rotate-90"
                      )}
                    />
                    {isOpen ? (
                      <FolderOpen className="h-3.5 w-3.5 text-amber-400/90 shrink-0" />
                    ) : (
                      <Folder className="h-3.5 w-3.5 text-amber-400/80 shrink-0" />
                    )}
                  </>
                ) : (
                  <>
                    <span className="w-3" />
                    {getFileIcon(item.name)}
                  </>
                )}

                <span className="truncate flex-1">{item.name}</span>

                {item.badge && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                    {item.badge}
                  </span>
                )}

                {item.status && (
                  <span
                    className={cn(
                      "font-mono text-[9px] font-semibold px-1 rounded",
                      item.status === "added" && "text-emerald-400 bg-emerald-500/10",
                      item.status === "modified" && "text-amber-400 bg-amber-500/10",
                      item.status === "verified" && "text-cyan-400 bg-cyan-500/10"
                    )}
                  >
                    {item.status === "added"
                      ? "A"
                      : item.status === "modified"
                        ? "M"
                        : "✓"}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
