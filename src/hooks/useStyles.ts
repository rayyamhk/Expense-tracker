type css = (...classNames: (string|boolean)[]) => string;

function useStyles(cssModule: object): css {
  return (...classNames) => {
    const classes: string[] = [];
    classNames.forEach((className) => {
      if (typeof className !== 'boolean') {
        classes.push(cssModule[className] || className);
      }
    });
    return classes.join(' ');
  };
}

export default useStyles;
