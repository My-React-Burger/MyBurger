import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navigationitem from './Navigationitem/Navigationitem';
import Navigationitems from './Navigationitems';

configure({adapter: new Adapter()});

describe('<Navigationitems/>',() =>{
    it('Should render two navigation items if not authenticated', () =>{
        const wrapper = shallow(<Navigationitems />);
        expect(wrapper.find(Navigationitem)).toHaveLength(2);
    });
} );