const form = document.getElementById('agent-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    whatsapp: form.whatsapp.value,
  };

  try {
    const response = await fetch('/submit-agent-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert('An error occurred. Please try again.');
    console.error(error);
  }
});
