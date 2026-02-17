'use client';

import grapejs from 'grapesjs';
import newsletterPlugin from 'grapesjs-preset-newsletter';
import 'grapesjs/dist/css/grapes.min.css';
import React from 'react';
import { TextareaFieldClientComponent } from 'payload';
import { useField } from '@payloadcms/ui';

const TemplateBuilder: TextareaFieldClientComponent = ({ path }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { value, setValue } = useField<string>({ path });

  React.useEffect(() => {
    if (!containerRef.current) return;
    const editor = grapejs.init({
      container: containerRef.current,
      plugins: [newsletterPlugin],
      pluginsOpts: {
        'grapesjs-plugin-newsletter': {},
      },
    });

    if (value) {
      try {
        editor.loadProjectData(JSON.parse(value));
      } catch (error) {
        console.log(error);
      }
    }

    editor.on('update', () => {
      const data = editor.getProjectData();
      setValue(JSON.stringify(data));
    });

    return () => editor.destroy();
  }, []);

  return (
    <div className="gjs-wrapper">
      <div ref={containerRef} />
    </div>
  );
};

export default TemplateBuilder;
