import React from 'react';
import { FaFilePdf, FaFileExcel, FaPrint } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useAxios } from '@hooks/useAxios';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadOption: (option: string) => void;
  selectedOrders: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onDownloadOption,
  selectedOrders = '61832705',
}) => {
  const { useAxiosRequest } = useAxios();
  const orders = selectedOrders || '61832705';

  const downloadPDF = async () => {
    // const response = await useAxiosRequest(
    //   `/order/export/pdf?orders=${orders}`,
    //   'POST',
    // );

    const pdfUrl =
      ' http://10.224.5.201/storage/orders/pdf/PFHMluTz8jHamG7q.pdf';

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'orders.pdf'; // You can set a default file name
    document.body.appendChild(link);
    link.click();
    // try {
    //   const response = await useAxiosRequest(
    //     `/order/export/pdf?orders=${orders}`,
    //     'POST',
    //   );
    //   if (response && response.data && response.data.url) {
    //     const baseURL = 'https://10.224.5.201';
    //     const pdfUrl = `${baseURL}${response.data.url}`;

    //     const pdfResponse = await fetch(pdfUrl);
    //     const pdfBlob = await pdfResponse.blob();
    //     const pdfObjectUrl = URL.createObjectURL(pdfBlob);

    //     const aTag = document.createElement('a');
    //     aTag.href = pdfObjectUrl;
    //     aTag.setAttribute('download', 'Document.pdf');
    //     document.body.appendChild(aTag);
    //     aTag.click();
    //     document.body.removeChild(aTag);

    //     setTimeout(() => URL.revokeObjectURL(pdfObjectUrl), 1000);
    //   } else {
    //     console.error('Invalid response structure:', response);
    //   }
    // } catch (error) {
    //   console.error('Error downloading PDF:', error);
    // }
  };

  const handleDownload = () => {
    fetch(`https://10.224.5.201/order/export/pdf?orders=61832705`, {
      method: 'POST',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute('download', 'filename');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'filename.pdf');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="w-96 rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-semibold">Download Options</h2>
        <div className="space-y-4">
          <button
            onClick={downloadPDF}
            className="flex w-full items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            <FaFilePdf className="h-6 w-6" />
            <span>Download as PDF</span>
          </button>
          <button
            onClick={() => onDownloadOption('Excel')}
            className="flex w-full items-center justify-center space-x-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            <FaFileExcel className="h-6 w-6" />
            <span>Download as Excel</span>
          </button>
          <button
            onClick={() => onDownloadOption('Print PDF')}
            className="flex w-full items-center justify-center space-x-2 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            <FaPrint className="h-6 w-6" />
            <span>Print PDF</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DownloadModal;
