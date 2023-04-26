import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string,
  description: string,
  type: string,
  link?: string,
  onExit: () => void,
};

export const Notification: React.FC<Props> = ({
  title, description, type, link, onExit
}) => {

  return (
    <div className={`notification ${type}`}>
      <button
        className="delete is-small"
        onClick={() => onExit()}
      />
      <h2 className="notification__title">
        {title}
      </h2>

      <p className="notification__message">
        {description}
      </p>

      {link && (
        <Link to={link}>
          Перейти
        </Link>
      )}
    </div>
  );
};
