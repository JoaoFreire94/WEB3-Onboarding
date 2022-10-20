interface IImagesType {
  [key: string]: string;
}

export const Images: IImagesType = {
  // eslint-disable-next-line global-require
  backgroundImage: require('./Images/backGroundImage.jpg')
};
