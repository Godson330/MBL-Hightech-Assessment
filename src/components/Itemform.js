import React, { useState } from 'react';

function ItemForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="item name"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ItemForm;