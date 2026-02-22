import { Handle, Position, type NodeProps } from 'reactflow';

export const StartNode = ({ data }: NodeProps) => {
    return (
        <div className="bg-green-50 border-2 border-green-500 rounded-full px-6 py-3 shadow-md min-w-[120px] text-center">
            <div className="font-bold text-green-900">{data.label || 'Start'}</div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
        </div>
    );
};

export const EndNode = ({ data }: NodeProps) => {
    return (
        <div className="bg-red-50 border-2 border-red-500 rounded-full px-6 py-3 shadow-md min-w-[120px] text-center">
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-red-500" />
            <div className="font-bold text-red-900">{data.label || 'End'}</div>
        </div>
    );
};

export const ApiNode = ({ data }: NodeProps) => {
    return (
        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4 shadow-md min-w-[180px]">
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded font-bold">API</span>
                <span className="font-bold text-blue-900 truncate">{data.label || 'API Request'}</span>
            </div>
            {(data.method || data.endpoint) && (
                <div className="bg-white rounded border border-blue-200 p-2 text-xs flex mt-1">
                    <span className="font-bold text-blue-700 mr-2">{data.method || 'GET'}</span>
                    <span className="text-gray-600 truncate flex-1" title={data.endpoint}>
                        {data.endpoint || '/api/v1/...'}
                    </span>
                </div>
            )}
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
        </div>
    );
};

export const ConditionNode = ({ data }: NodeProps) => {
    return (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 shadow-md min-w-[180px] text-center">
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-yellow-500" />
            <div className="flex items-center justify-center gap-2 mb-2">
                <span className="font-bold text-yellow-900">{data.label || 'Condition'}</span>
            </div>
            {data.condition && (
                <div className="bg-white rounded border border-yellow-200 p-2 text-xs font-mono text-yellow-800 break-all mt-1">
                    if ({data.condition})
                </div>
            )}
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <div className="text-green-600">Yes</div>
                <div className="text-red-600">No</div>
            </div>
            <Handle type="source" position={Position.Bottom} id="true" style={{ left: '25%' }} className="w-3 h-3 bg-green-500" />
            <Handle type="source" position={Position.Bottom} id="false" style={{ left: '75%' }} className="w-3 h-3 bg-red-500" />
        </div>
    );
};

export const DelayNode = ({ data }: NodeProps) => {
    return (
        <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-4 shadow-md min-w-[150px] text-center">
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-500" />
            <div className="font-bold text-purple-900 mb-2">{data.label || 'Delay Node'}</div>
            {data.delay && (
                <div className="bg-white rounded border border-purple-200 p-2 text-sm text-purple-700 font-mono mt-1">
                    ⏱ {data.delay} ms
                </div>
            )}
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-purple-500" />
        </div>
    );
};

export const customNodeTypes = {
    start: StartNode,
    end: EndNode,
    api: ApiNode,
    condition: ConditionNode,
    delay: DelayNode,
};
