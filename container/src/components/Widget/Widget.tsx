import React, { useEffect } from "react";
//@ts-ignore
export const Widget = ({ name, host, history }) => {
  useEffect(() => {
    const scriptId = `widget-script-${name}`;

    const renderWidget = () => {
      //@ts-ignore
      window[`render${name}`](`${name}-container`, history);
    };

    if (document.getElementById(scriptId)) {
      renderWidget();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res: any) => res.json())
      .then((manifest: any) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = () => {
          renderWidget();
        };
        document.head.appendChild(script);
      });

    return () => {
      //@ts-ignore
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  });

  return <main id={`${name}-container`} />;
};
