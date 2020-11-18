import React from 'react';
import RegistroCliente from './RegistroCliente';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
    const input = wrapper.find(inputSelector)
    input.simulate('change', {
        target: { value: newValue },
    })
    return wrapper.find(inputSelector);
}
 
describe('RegistroCliente', () => {
    it('Si algun campo esta vacío no se debe llamar handleSubmit', () => {
        const wrapper = Enzyme.shallow(<RegistroCliente />);
        const nombreInput = simulateChangeOnInput(wrapper, '#nombre', '');
        const apellidoInput = simulateChangeOnInput(wrapper, '#apellido', '');
        const celularInput = simulateChangeOnInput(wrapper, '#celular', '');
        const documentoInput = simulateChangeOnInput(wrapper, '#documento', '');
        const direccionInput = simulateChangeOnInput(wrapper, '#direccion', '');
        const photoInput = simulateChangeOnInput(wrapper, '#photo', '');
        const passwordInput = simulateChangeOnInput(wrapper, '#password', '');
        expect(nombreInput.props().value).toEqual('');
        expect(apellidoInput.props().value).toEqual('');
        expect(celularInput.props().value).toEqual('');
        expect(documentoInput.props().value).toEqual('');
        expect(direccionInput.props().value).toEqual('');
        expect(photoInput.props().value).toEqual('');
        expect(passwordInput.props().value).toEqual('');
        const form = wrapper.find('form');
        const buttonSubmit = wrapper.find('#buttonsubmit');
        buttonSubmit.simulate('click');
        expect(form.props().onSubmit.called).toEqual(false);
    })
    it('Si tengo campos llenos pero fecha mayor o igual a hoy no permite', () => {
        const wrapper = Enzyme.shallow(<RegistroCliente />);
        const nombreInput = simulateChangeOnInput(wrapper, '#nombre', 'Gonzalo');
        const apellidoInput = simulateChangeOnInput(wrapper, '#apellido', 'Martinez');
        const celularInput = simulateChangeOnInput(wrapper, '#celular', '3130000000');
        const documentoInput = simulateChangeOnInput(wrapper, '#documento', '123456789');
        const direccionInput = simulateChangeOnInput(wrapper, '#direccion', 'Carrera 10');
        const photoInput = simulateChangeOnInput(wrapper, '#photo', 'foto.jpg');
        const passwordInput = simulateChangeOnInput(wrapper, '#password', 'password');
        const dateInput = simulateChangeOnInput(wrapper, '#fechanacimiento', new Date('2021-12-05'))
        expect(nombreInput.props().value).toEqual('Gonzalo');
        expect(apellidoInput.props().value).toEqual('Martinez');
        expect(celularInput.props().value).toEqual('3130000000');
        expect(documentoInput.props().value).toEqual('123456789');
        expect(direccionInput.props().value).toEqual('Carrera 10');
        expect(photoInput.props().value).toEqual('foto.jpg');
        expect(passwordInput.props().value).toEqual('password');
        expect(dateInput.props().value).toEqual(new Date('2021-12-05'))
        const form = wrapper.find('form');
        const buttonSubmit = wrapper.find('#buttonsubmit');
        buttonSubmit.simulate('click');
        expect(form.props().onSubmit.called).toEqual(true);
        expect(form.props().onSubmit.dateError).toEqual(true);
    })
    it('Si tengo campos llenos y fecha correcta permite', () => {
        const wrapper = Enzyme.shallow(<RegistroCliente />);
        const nombreInput = simulateChangeOnInput(wrapper, '#nombre', 'Gonzalo');
        const apellidoInput = simulateChangeOnInput(wrapper, '#apellido', 'Martinez');
        const celularInput = simulateChangeOnInput(wrapper, '#celular', '3130000000');
        const documentoInput = simulateChangeOnInput(wrapper, '#documento', '123456789');
        const direccionInput = simulateChangeOnInput(wrapper, '#direccion', 'Carrera 10');
        const photoInput = simulateChangeOnInput(wrapper, '#photo', 'foto.jpg');
        const passwordInput = simulateChangeOnInput(wrapper, '#password', 'password');
        const dateInput = simulateChangeOnInput(wrapper, '#fechanacimiento', new Date('1977-02-02'))
        expect(nombreInput.props().value).toEqual('Gonzalo');
        expect(apellidoInput.props().value).toEqual('Martinez');
        expect(celularInput.props().value).toEqual('3130000000');
        expect(documentoInput.props().value).toEqual('123456789');
        expect(direccionInput.props().value).toEqual('Carrera 10');
        expect(photoInput.props().value).toEqual('foto.jpg');
        expect(passwordInput.props().value).toEqual('password');
        expect(dateInput.props().value).toEqual(new Date('1977-02-02'))
        const form = wrapper.find('form');
        const buttonSubmit = wrapper.find('#buttonsubmit');
        buttonSubmit.simulate('click');
        expect(form.props().onSubmit.called).toEqual(true);
        expect(form.props().onSubmit.dateError).toEqual(false);
    })
})