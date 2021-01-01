import { keyframes } from 'styled-components';

export const rotateAnimation = keyframes`
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
`;

export const fadeInAnimation = keyframes`
	0%   { opacity:0; }
	100% {  opacity:1;}
`;
