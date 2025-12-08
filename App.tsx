import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import BootSelector from './components/BootSelector';
import BootSequence from './components/BootSequence';
import { Theme } from './types';

type AppStage = 'selection' | 'booting' | 'desktop';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('selection');
  const [selectedTheme, setSelectedTheme] = useState<Theme>('macos');

  // 移除 localStorage，改用内存状态
  useEffect(() => {
    // 默认总是显示选择页面，不再从 localStorage 读取
    setStage('selection');
  }, []);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setStage('booting');
  };

  const handleBootComplete = () => {
    setStage('desktop');
  };

  const handleLock = () => {
    // "Log Out" action - 返回选择页面
    setStage('selection');
  };

  return (
    <div className="w-full h-full">
      {stage === 'selection' && (
        <BootSelector onSelect={handleThemeSelect} />
      )}

      {stage === 'booting' && (
        <BootSequence theme={selectedTheme} onComplete={handleBootComplete} />
      )}

      {stage === 'desktop' && (
        <Desktop
          onLock={handleLock}
          initialTheme={selectedTheme}
        />
      )}
    </div>
  );
};

export default App;
