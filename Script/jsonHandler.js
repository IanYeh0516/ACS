export async function loadLocalJson(path) {
    // 通過 HTTP 協議加載本地 JSON 文件
    return fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP 錯誤！狀態碼: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("通過 HTTP 加載的本地 JSON:", data);
        return data;
      })
      .catch(error => {
        console.error("無法通過 HTTP 加載本地 JSON:", error);
        return null;
      });
  }
  
  // 通過 API 加載 JSON 的函數
  export async function loadJsonFromApi(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP 錯誤！狀態碼: ${response.status}`);
      }
      const data = await response.json();
      console.log("從 API 加載的 JSON:", data);
      return data;
    } catch (error) {
      console.error("無法從 API 加載 JSON:", error);
      return null;
    }
  }
  