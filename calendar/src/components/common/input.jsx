import React from 'react';

const Input = ({name, label, error, ...rest}) => {

        return (
            <div>
                <label className="m-0" htmlFor={name}>{label}</label>
                <input className="form-control mb-3" {...rest} name={name} id={name}/>
                {error && <div className="alert alert-danger alert-sm rounded">{error}</div>}
            </div>
                        

        );
}

export default Input;

