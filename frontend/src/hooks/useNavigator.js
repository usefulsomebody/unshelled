import { useNavigate, useParams } from 'react-router-dom';

function useNavigator() {
  const navigate = useNavigate();
  const { search } = useParams();

  return (url, replace = false, preserveQs = false) => {
    const targetUrl = preserveQs ? url + search : url;
    navigate(targetUrl, { replace });

    window.scrollTo({ behavior: 'smooth', top: 0 });
  };
}

export default useNavigator;
