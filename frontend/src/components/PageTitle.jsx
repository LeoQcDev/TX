// @/components/PageTitle.jsx
// titulos de las paginas

import React from "react";

const PageTitle = ({ title }) => {
  return (
    <header className="mt-6 mb-8">
      <h1 className="text-2xl font-bold my-4">{title}</h1>
    </header>
  );
};

export default PageTitle;
