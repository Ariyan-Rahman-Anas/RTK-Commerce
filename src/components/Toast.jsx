import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from './../features/notifications/notificationSlice';

const Toast = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, notification.duration || 5000); 
      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-2 right-2 space-y-2 z-[9000] ">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg flex items-center relative overflow-hidden ${
            notification.type === 'success' ? 'bg-primary text-white' : 'bg-red-500 text-white'
          }`}
        >
          <span className="flex-1">{notification.message}</span>
          <button
            className="ml-4"
            onClick={() => dispatch(removeNotification(notification.id))}
          >
            &times;
          </button>
          <div
            className="absolute bottom-0 left-0 h-1 bg-white"
            style={{ animation: `progress ${notification.duration || 5000}ms linear` }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};
export default Toast;