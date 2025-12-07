import { ReactNode } from 'react';

export type AppID = 'about' | 'projects' | 'contact' | 'settings' | 'terminal' | 'about_mac';

export type Theme = 'retro' | 'macos' | 'linux';

export interface AppConfig {
  id: AppID;
  title: string;
  icon: React.ComponentType<any>;
  component: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export interface WindowState {
  id: AppID;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  variant?: 'default' | 'dialog';
}

export interface FileSystemItem {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileSystemItem[];
}