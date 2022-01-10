import { useState, useRef } from 'react';
import useStyles from '../../../hooks/useStyles';
import styles from './withPressHold.module.css';

export default function withPressHold(Component, handler) {
  return function PressHoldComponent({ children, ...props }) {
    const [mouseMove, setMouseMove] = useState(false);
    const ref = useRef();
    const css = useStyles(styles);

    const pressedClassName = css('pressed');

    const onTouchStart = (e) => {
      if (e.touches.length <= 1) {
        setMouseMove(false);
        ref.current.classList.add(pressedClassName);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length <= 1) {
        setMouseMove(true);
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length <= 1) {
        if (!mouseMove) {
          handler(e);
        }
        ref.current.classList.remove(pressedClassName);
      }
    };

    const onTouchCancel = (e) => {
      if (e.touches.length <= 1) {
        ref.current.classList.remove(pressedClassName);
      }
    };

    return (
      <Component
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        style={{ position: 'relative' }}
        {...props}
      >
        {children}
        <span
          ref={ref}
          className={css('overlay')}
        />
      </Component>
    );
  }
}
