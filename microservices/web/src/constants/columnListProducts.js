import React from 'react';
import { Tag } from 'antd';
import { strUcFirst } from '../helpers/string';

export const columnListProducts = [
  {
    title: 'Produit',
    dataIndex: 'title',
    key: 'title',
    render: (title) => (
      <h1>{strUcFirst(title)}</h1>
    ),
  },
  {
    title: 'Prix',
    dataIndex: 'price',
    key: 'price',
    render: (price) => (
      <Tag className="tag" color="green">
        {price}
      </Tag>
    ),
  },
  {
    title: 'Catégorie',
    dataIndex: 'category',
    key: 'category',
    render: (category) => (
      <Tag className="tag" color="geekblue">
        {strUcFirst(category)}
      </Tag>
    ),
  },
];

export const columnListProductsForOrders = [
  {
    title: 'Produit',
    dataIndex: 'title',
    key: 'title',
    render: (title) => (
      <h3>{strUcFirst(title)}</h3>
    ),
  },
  {
    title: 'Prix',
    dataIndex: 'price',
    key: 'price',
    render: (price) => (
      <Tag className="tag" color="blue">
        {price}
      </Tag>
    ),
  },
];
