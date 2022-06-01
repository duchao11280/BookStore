import React, { useContext } from 'react'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
const ContextAwareToggle = ({ children, eventKey, callback }) => {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            className="btn"

            onClick={decoratedOnClick}
        >
            {isCurrentEventKey ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}
        </button>
    );

}

export default ContextAwareToggle
