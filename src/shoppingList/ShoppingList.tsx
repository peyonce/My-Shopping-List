
import React, { useEffect } from 'react';
import useShoppingList from './useShoppingList';

const ShoppingListPage: React.FC = () => {
    const {
        shoppingLists,
        fetchShoppingLists,

    } = useShoppingList();

    useEffect(() => {
        fetchShoppingLists();
    }, [fetchShoppingLists]);

    return (
        <div>
            <h1>Shopping Lists</h1>
            <ul>
                {shoppingLists.map((list) => (
                    <li key={list.id}>
                        {list.name} - {list.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingListPage;
