export const url = 'http://localhost:3000';

export const login = async (username: string, password: string) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch(`${url}/auth/login`, config);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Invalid login');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registers = async (email:string, username: string, password: string) => {
  try {
    const config = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    };

    const response = await fetch(`${url}/auth/register`, config);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Fail to Register');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
