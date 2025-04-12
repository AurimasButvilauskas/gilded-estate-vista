
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none">
        <Globe size={16} className="text-luxury-gold" />
        <span className="hidden md:inline text-luxury-navy">{currentLang?.code.toUpperCase()}</span>
        <ChevronDown size={14} className="text-luxury-navy" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-md rounded-md border border-gray-200">
        <div className="py-2 px-3 border-b border-gray-100">
          <p className="text-sm text-gray-500">{t('common.languageSelector.selectLanguage')}</p>
        </div>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLanguage === language.code ? 'bg-gray-50' : ''
            }`}
            onClick={() => {
              changeLanguage(language.code);
              setIsOpen(false);
            }}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {currentLanguage === language.code && (
              <span className="w-2 h-2 bg-luxury-gold rounded-full"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
