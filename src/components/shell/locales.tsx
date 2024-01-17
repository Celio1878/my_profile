export const Locales = () => {
  const languages = [
    { name: "English", flag: "🇬🇧", code: "en" },
    { name: "Português", flag: "🇧🇷", code: "pt" },
    { name: "Deutsch", flag: "🇩🇪", code: "de" },
    { name: "Français", flag: "🇫🇷", code: "fr" },
    { name: "Español", flag: "🇪🇸", code: "es" },
  ];
  return (
    <div className="text-black dark:text-gray-50">
      <ul className="flex flex-row items-center justify-between">
        {languages.map((language) => (
          <button className="mx-4 hover:underline" key={language.code}>
            {language.flag} {language.name}
          </button>
        ))}
      </ul>
    </div>
  );
};
