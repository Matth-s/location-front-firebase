import Header from '../../components/header/Header';
import CreateMaterialForm from '../../components/forms/create-material-form/CreateMaterialForm';

import './styles.scss';

const CreateMaterialPage = () => {
  return (
    <div className="create-metarial-page-container">
      <Header />
      <CreateMaterialForm />
    </div>
  );
};

export default CreateMaterialPage;
