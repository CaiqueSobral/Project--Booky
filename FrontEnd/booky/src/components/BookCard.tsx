'use client';

import moment, { now } from 'moment';
import { useState } from 'react';

type Props = {
  listedBook: {
    book: {
      author: string;
      id: string;
      title: string;
    };
    dateAdded: Date;
    dateConcluded: Date | null;
    id: string;
    score: number | null;
    status: string;
  };
  deleteBook: (id: string, bookId: string) => void;
  updateBook: (
    id: string,
    status: string,
    dateConcluded: Date | null,
    score: number | null
  ) => void;
};

export function BookCard(props: Props) {
  const setDefaultValue = () => {
    if (props.listedBook.status === 'TOREAD') return 'Quero Ler';
    if (props.listedBook.status === 'READING') return 'Lendo';
    if (props.listedBook.status === 'COMPLETED') return 'Lido';

    return '';
  };

  const [selectedStatus, setStatus] = useState(setDefaultValue());
  const [selectedScore, setScore] = useState(props.listedBook.score);
  const [visibleSaveButton, setVisible] = useState(false);
  const [selectedConcludedDate, setConcludedDate] = useState<Date | null>(
    props.listedBook.dateConcluded
  );

  const setStatusToEnum = () => {
    if (selectedStatus === 'Quero Ler') return 'TOREAD';
    if (selectedStatus === 'Lendo') return 'READING';
    if (selectedStatus === 'Lido') return 'COMPLETED';

    return '';
  };

  return (
    <div className="relative lg:w-[800px] lg:h-[300px] md:w-[600px] md:h-[300px] bg-purple-700 rounded-xl px-4 py-4 flex items-center justify-center gap-6 shadow-2xl">
      <span
        onClick={() =>
          props.deleteBook(props.listedBook.id, props.listedBook.book.id)
        }
        className="absolute top-2 left-4 font-semibold text-purple-100 text-xl"
      >
        X
      </span>

      <div className="flex-1 w-2/5 h-full  flex flex-col items-center justify-center gap-8">
        <span className="lg:text-2xl md:text-lg text-purple-100 bg-purple-400 rounded-xl px-4 py-2 font-semibold text-justify">
          {props.listedBook.book.title}
        </span>
        <span className="lg:text-2xl md:text-lg text-purple-100 bg-purple-400 rounded-xl px-4 py-2 font-semibold">
          {props.listedBook.book.author}
        </span>
      </div>
      <div className="relative flex-1 w-2/5 h-full rounded-xl flex flex-col items-center justify-center gap-6 bg-purple-400">
        {visibleSaveButton && (
          <button
            onClick={() => {
              props.updateBook(
                props.listedBook.id,
                setStatusToEnum(),
                selectedConcludedDate,
                selectedScore
              );
              setVisible(false);
            }}
            className="absolute top-2 right-2 font-semibold bg-purple-700 text-purple-100 px-4 py-1 rounded-xl"
          >
            Salvar
          </button>
        )}
        {selectedStatus === 'Lido' ? (
          <input
            type="text"
            about="Book Score"
            defaultValue={selectedScore ? selectedScore : '0'}
            onChange={(item) => setScore(Number(item.target.value))}
            className="lg:text-8xl md:text-6xl text-purple-100 bg-purple-400 h-24 w-24 rounded-xl text-center align-middle"
          ></input>
        ) : (
          <input
            type="text"
            about="Book Score"
            disabled
            value={'-'}
            className="lg:text-8xl  md:text-6xl text-purple-100 bg-purple-400 h-24 w-24 rounded-xl text-center align-middle"
          ></input>
        )}

        <select
          id="status"
          className="text-base font-semibold px-2 py-2 bg-purple-700 text-purple-100 rounded-xl"
          defaultValue={setDefaultValue()}
          onChange={(item) => {
            setStatus(item.target.value);
            if (item.target.value === 'Lido') {
              setConcludedDate(new Date());
              setScore(0);
            } else {
              setConcludedDate(null);
            }
            setVisible(true);
          }}
        >
          <option about="reading status" value="Quero Ler">
            {'Quero ler'}
          </option>
          <option about="reading status" value="Lendo">
            {'Lendo'}
          </option>
          <option about="reading status" value="Lido">
            {'Lido'}
          </option>
        </select>

        {selectedConcludedDate && (
          <span className="text-base font-semibold text-purple-100 absolute bottom-4">{`Concluído em ${moment(
            selectedConcludedDate
          ).format('DD/MM/YYYY')}`}</span>
        )}
      </div>
      <span className="absolute text-sm rounded-xl px-4 py-2 font-medium text-purple-100 bottom-2 left-2">{`Adicionado em ${moment(
        props.listedBook.dateAdded
      ).format('DD/MM/YYYY')}`}</span>
    </div>
  );
}
