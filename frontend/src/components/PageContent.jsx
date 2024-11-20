// @/component/PageContent.jsx
// Sección vacía en la que renderizar las page.js

const PageContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto bg-gray-100 p-4">
      {/* Aquí se renderizarán las páginas */}
      {children}
    </main>
  );
};

export default PageContent;
