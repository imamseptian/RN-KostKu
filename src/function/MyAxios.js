import axios from 'axios';

class MyAxios {
  postAxios = async (url, data, myToken, cancelToken, onPost) => {
    await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
        cancelToken: cancelToken,
      })
      .then((response) => {
        onPost('success', response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('[CLASS] caught cancel filter');
          onPost('cancel', error);
        } else {
          onPost('error', error);
          // throw error;
        }
      });
  };

  getAxios = async (url, myToken, cancelToken, onGet) => {
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
        cancelToken: cancelToken,
      })
      .then((response) => {
        onGet('success', response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('[CLASS] caught cancel filter');
          onGet('cancel', error);
        } else {
          onGet('error', error);
          throw error;
        }
      });
  };
}

export const myAxios = new MyAxios();
