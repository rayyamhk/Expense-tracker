export default function useStyles(cssModule) {
  return (...classNames) => {
    const classes = [];
    classNames.forEach((className) => {
      if (className) {
        classes.push(cssModule[className] || className);
      }
    });
    return classes.join(' ');
  };
}
