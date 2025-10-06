
export default function AuthInput({className, type, name, id, placeholder}){
    return(
        <div>
            <input 
            className={` ${className ? className : ''} *
                w-full text-lg shadow-lg border-gray-400 px-5 py-3 rounded-sm outline-none transition-all bg-[#ffffff2e] focus:ring-gray-100 focus:ring-1
                md:py-4 md:px-6
            `}
            
            type={type}
            name={name}
            id={id} 
            placeholder={placeholder}
        />
        </div>
    )
}