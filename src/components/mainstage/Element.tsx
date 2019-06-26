import * as React from 'react';
import Draggable from 'react-draggable';
import { Element, Paragraph } from '../../styles/Element';
import { DragState } from '../../lib/DraggableHOC';
import SelectionState, { SelectionStateProvider } from '../../lib/Selection';
import { TextElement } from './TextElement';
import { Mode } from '../../types';
import ModeSetting from '../../data/Mode';
import  CVConsumer  from 'src/data/Cvdata';

const ParagraphBox = props => (
  <SelectionState>
    {({ select, selectedId }) => (
      // tslint:disable:jsx-no-lambda
      <Paragraph
        onMouseDown={e => select(e, props.id)}
        selected={selectedId === props.id}
      >
        <TextElement selected={selectedId === props.id} {...props} />
      </Paragraph>
    )}
  </SelectionState>
);

const DraggableWrapper = props => (
  <CVConsumer>
    {({updatePosition}) => (
      <DragState>
        {({ dragHandlers, handleDrag, deltaPosition }) => (
          <Draggable
            bounds="parent"
            grid={[20, 20]}
            onDrag={(e, ui) => {
              handleDrag(e, ui),
                updatePosition(props.id, deltaPosition);
            }}
            {...dragHandlers}
          >
            {props.children}
          </Draggable>
        )}
      </DragState>
    )}
  </CVConsumer>
);

export const Node = (node ) => (
  <ModeSetting>
    {({ mode }) =>
      mode === Mode.DRAG ? (
        <DraggableWrapper id={node.id}>
          <Element className="box" {...node}>
            {node.paragraphs.map(p => (
              <ParagraphBox key={p.id} {...p} />
            ))}
          </Element>
        </DraggableWrapper>
      ) : (
        <Element className="box" {...node}>
          {node.paragraphs.map(p => (
            <ParagraphBox key={p.id} {...p} />
          ))}
        </Element>
      )
    }
  </ModeSetting>
);
