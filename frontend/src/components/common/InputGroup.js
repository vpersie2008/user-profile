import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    onChange
}) => {
    return (
        <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
        </div>
            <input
                
                className={classnames("form-control form-control-lg", {"is-invalid": error})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}/> 
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )

}

InputGroup.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    icon: PropTypes.string
};

export default InputGroup;
