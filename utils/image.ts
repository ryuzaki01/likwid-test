const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

export const resizeImage = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const reader = new FileReader();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL())
      }

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      }

      reader.readAsDataURL(file)
    } catch (err: any) {
      reject(err.message)
    }
  })
}