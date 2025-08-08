import Modal from "@/components/ui/modal";

const ImportFromPhrase = ({
  nodeRef,
  close,
  props,
}: {
  nodeRef: React.Ref<HTMLDivElement>;
  close: any;
  props: any;
}) => {
  return (
    <Modal
      title="Position Created Successfully"
      close={close}
      onClickOutside={close}
      ref={nodeRef}
      navClassName="px-4"
      className={`flex flex-col rounded-[8px] transition-all duration-150 px-0`}
    >
      <div className="flex gap-3">
        Quantity ${props.qty}
        {/* <CopyButton value={props}>
              <div className="ml-auto px-4 py-2 border rounded-full">Copy</div>
            </CopyButton> */}
      </div>
    </Modal>
  );
};
export default ImportFromPhrase;
