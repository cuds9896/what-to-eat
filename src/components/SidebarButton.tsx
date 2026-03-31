export const SidebarButton = ({ className = "", children = "" }) => {
  return (
    <a
      href="#"
      className={`text-gray-200 h-12 flex items-center pl-4 pr-8 rounded-l-2xl my-2 border-4 border-white transition hover:-translate-x-2 drop-shadow-lg ${className}`}
    >
      {children}
    </a>
  );
};
