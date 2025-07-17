// Utility functions for modal management

/**
 * Prevents body scroll when modal is open
 */
export const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = getScrollbarWidth() + 'px';
};

/**
 * Re-enables body scroll when modal is closed
 */
export const enableBodyScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * Gets the scrollbar width to prevent layout shift
 */
const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

/**
 * Handles escape key press to close modal
 */
export const handleEscapeKey = (callback) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      callback();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Focuses the first focusable element in the modal
 */
export const focusFirstElement = (modalRef) => {
  if (!modalRef.current) return;
  
  const focusableElements = modalRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
};

/**
 * Traps focus within the modal
 */
export const trapFocus = (modalRef) => {
  if (!modalRef.current) return;

  const focusableElements = modalRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (event) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  document.addEventListener('keydown', handleTabKey);

  return () => {
    document.removeEventListener('keydown', handleTabKey);
  };
};
