import React from 'react';
import { NativeSelect } from '../../components/primitive/inputs/NativeSelect';

const LegalScreen: React.FC = () => {
  return (
    <div>
      <p>
        All the data is proccessed in your web browser and will never leave your
        engine.
      </p>
      <NativeSelect
        data={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
        ]}
      />
    </div>
  );
};

export default LegalScreen;
