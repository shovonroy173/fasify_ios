import { useTranslation } from 'react-i18next';

const useT = () => {
  const { t } = useTranslation();
  return t;
};

export default useT;