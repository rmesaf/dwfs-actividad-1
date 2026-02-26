// Packages

// App
import Divider from 'shared/components/Divider';
import cn from 'classnames';

// Styles
import './styles.scss';

function MultiSelectButton({
    className = '',
    label,
    name,
    onChange = () => { },
    options = [],
    selectedOptions = [],
}) {

    const handleToggle = item => {
        const newItems = selectedOptions.includes(item.key)
            ? selectedOptions.filter(i => i !== item.key)
            : [...selectedOptions, item.key];
        onChange(name, newItems);
    };

    return (
        <div className={cn("multi-select-button", className)}>
            <h6 className='multi-select-button__label'>{label}</h6>
            <Divider />
            <div className='multi-select-button__options'>
                {options?.map(item => {
                    const isChecked = selectedOptions.includes(item.key);
                    return (
                        <div key={item.key} className="multi-select-button__option">
                            <input
                                type="checkbox"
                                id={`${item.key}`}
                                className={cn("multi-select-button__checkbox", {
                                    "multi-select-button__checkbox--checked": isChecked,
                                })}
                                name={item.name}
                                checked={isChecked}
                                onChange={() => handleToggle(item)}
                            />
                            <label
                                htmlFor={`${item.key}`}
                                className={cn("multi-select-button__checkbox-label", {
                                    "multi-select-button__checkbox-label--checked": isChecked,
                                })}
                            >
                                {item.key} ({item.count})
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MultiSelectButton;