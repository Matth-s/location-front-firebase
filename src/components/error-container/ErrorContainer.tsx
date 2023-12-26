import './styles.scss';

type Props = {
  children: React.ReactNode;
};

const ErrorContainer = ({ children }: Props) => {
  return (
    <div className="error-container">
      <h2>Une erreur est survenue</h2>
      {children}
    </div>
  );
};

export default ErrorContainer;
