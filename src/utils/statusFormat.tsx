import { FaCheckCircle, FaArchive, FaUndo } from 'react-icons/fa';

const getStatusName = (statusCode: string) => {
    switch (statusCode) {
        case 'SUCCESS':
            return 'Успех';
        case 'PROCESSING':
            return 'В обработке';
        case 'DRAFT':
            return 'Черновик';
        default:
            return 'Неизвестный статус';
    }
};

const getStatusLogo = (statusCode: string) => {
    switch (statusCode) {
        case 'PROCESSING':
            return <FaUndo size={40} color="#0080ff" className="spinner m-1" />;
        case 'SUCCESS':
            return <FaCheckCircle size={40} color="#0080ff" className="m-1" />;
        case 'DRAFT':
            return <FaArchive size={40} color="#0080ff" className="m-1" />;
        default:
            return null;
    }
};

export { getStatusName, getStatusLogo };
