
export default function AuthInput({type, name, id, placeholder, value, onChange, disabled, className}){
    return(
        <div>
            <input 
            className={` ${className ? className : ''}
                w-full text-sm px-3 py-2 rounded border border-gray-300 outline-none transition-all bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500
            `}
            
            type={type}
            name={name}
            id={id} 
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
        </div>
    )
}